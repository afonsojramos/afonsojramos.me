import {
  Afonso,
  ArrowLeft,
  Command as CommandIcon,
  GitHub,
  Home,
  Lightbulb,
  LinkedIn,
  Music,
  Pencil,
  Search,
  Sparkles,
  Travel
} from '@components/icons';
import cn from 'classnames';
import { Command } from 'cmdk';
import { HTMLAttributes, ReactNode, useEffect, useMemo, useState } from 'react';

import headerStyles from '@components/header/header.module.css';
import postMeta from '@data/blog.json';
import * as Popover from '@radix-ui/react-popover';
import { useTheme } from 'next-themes';
import router, { useRouter } from 'next/router';
import tinykeys from 'tinykeys';
import Phone from '../icons/phone';
import styles from './command.module.scss';

enum PageGroup {
  Themes = 'themes',
  Blog = 'blog'
}

const pagesKeymap: { [key: string]: () => void } = {
  // Blog
  b: () => router.push('/blog'),
  // Navigation
  h: () => router.push('/'),
  c: () => router.push('/contacts'),
  // Collections
  w: () => router.push('/world'),
  m: () => router.push('/music'),
  i: () => router.push('/ideas'),
  // Backspace
  backspace: () => router.back()
};

const ThemeItems = ({ closeDialog }: { closeDialog: () => void }) => {
  const { theme: activeTheme, themes, setTheme } = useTheme();

  return (
    <>
      {themes.map((theme) => {
        console.log(theme);
        if (theme === activeTheme) return null;
        return (
          <Command.Item
            value={theme}
            key={`theme-${theme}`}
            onSelect={() => {
              setTheme(theme);
              closeDialog();
            }}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </Command.Item>
        );
      })}
    </>
  );
};

const BlogItems = () => {
  const router = useRouter();

  return (
    <>
      {postMeta.map((post, i) => {
        return (
          <Command.Item
            key={`blog-item-${post.title}-${i}`}
            value={post.title}
            onSelect={() => router.push('/blog/[slug]', `/blog/${post.slug}`)}
          >
            {post.title}
          </Command.Item>
        );
      })}
    </>
  );
};

const Item = ({
  value,
  keybind,
  onSelect,
  children,
  ...props
}: {
  value: string;
  keybind?: string;
  onSelect?: () => void;
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>;
}) => {
  const cb = () => {
    if (onSelect) {
      onSelect();
    }
    if (keybind && pagesKeymap[keybind]) {
      pagesKeymap[keybind]?.();
    }
  };

  return (
    <Command.Item key={value} onSelect={cb} {...props}>
      {children}

      {keybind && (
        <div cmdk-shortcuts="">
          {keybind.split(' ').map((key) => {
            return <kbd key={key}>{key}</kbd>;
          })}
        </div>
      )}
    </Command.Item>
  );
};

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<string[]>([]);
  const page = pages[pages.length - 1];

  const keymap = useMemo(() => {
    return {
      t: () => {
        setSearch('');
        setPages([PageGroup.Themes]);
        // timeout to prevent key in input
        setTimeout(() => setOpen(true), 100);
      },
      ...pagesKeymap
    };
  }, [setSearch, setPages, setOpen]);

  // Register the keybinds globally
  useEffect(() => {
    if (open) return;
    const unsubs = [tinykeys(window, keymap)];
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [open, keymap]);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Popover.Root modal open={open} onOpenChange={setOpen}>
      <Popover.Trigger className={headerStyles.command}>
        <CommandIcon />
      </Popover.Trigger>
      <div
        className={cn(styles.screen, {
          [styles.show]: open
        })}
      >
        <Popover.Content className={styles.command}>
          <Command
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !search) {
                e.preventDefault();
                setPages((pages) => pages.slice(0, -1));
              }
              if (e.key === 'Escape' && !page) {
                setOpen(false);
              }
            }}
          >
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder={
                page === PageGroup.Themes
                  ? 'Select a theme...'
                  : page === PageGroup.Blog
                  ? 'Search for posts...'
                  : 'Type a command or search...'
              }
            />
            <Command.List>
              {!page && (
                <>
                  <Command.Group heading="Pages">
                    <Item value="Blog" keybind="b">
                      <Pencil />
                      Blog
                    </Item>
                    <Item
                      value="Search"
                      onSelect={() => {
                        setPages([PageGroup.Blog]);
                        setSearch('');
                      }}
                    >
                      <Search />
                      Search blog posts…
                    </Item>
                    <Item value="World" keybind="w">
                      <Travel viewBox="0 0 44 44" />
                      World
                    </Item>
                    <Item value="Music" keybind="m">
                      <Music /> Music
                    </Item>
                    <Item value="Ideas" keybind="i">
                      <Lightbulb />
                      Ideas
                    </Item>
                  </Command.Group>
                  <Command.Group heading="Navigation">
                    <Item value="Contacts" keybind="c">
                      <Phone />
                      Contacts
                    </Item>
                    <Item
                      value="Menu"
                      keybind="⌘+k"
                      onSelect={() => setOpen(false)}
                    >
                      <CommandIcon />
                      Menu
                    </Item>
                    <Item value="Back" keybind="backspace">
                      <ArrowLeft />
                      Back
                    </Item>

                    <Item value="Home" keybind="h">
                      <Home />
                      Home
                    </Item>
                    <Item value="Themes" keybind="t">
                      <Sparkles />
                      Themes
                    </Item>
                  </Command.Group>
                  <Command.Group heading="Social">
                    <Item value="GitHub">
                      <GitHub />
                      GitHub
                    </Item>
                    <Item value="LinkedIn">
                      <LinkedIn />
                      LinkedIn
                    </Item>
                    <Item value="Status Page">
                      <Afonso />
                      Status
                    </Item>
                  </Command.Group>
                </>
              )}

              {page === PageGroup.Blog && <BlogItems />}

              {page === PageGroup.Themes && (
                <ThemeItems closeDialog={() => setOpen(false)} />
              )}
            </Command.List>
          </Command>
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};

export default CommandMenu;
