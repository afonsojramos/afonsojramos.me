import { CV, GitHub, LinkedIn, Mail, Telegram } from '@components/icons'
import Page from '@components/page'

import linkStyles from '../components/link/link.module.css'

const Contacts = () => {
  return (
    <Page title="Contacts" footer={false} description="Get in touch.">
      <article className="contacts">
        <p>Get in touch!</p>

        <div className="social">
          <a
            href="mailto:afonsojorgeramos@gmail.com?subject=Hello"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.gray}
          >
            <Mail size="50" />
          </a>
          <a
            href="https://github.com/afonsojramos"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.gray}
          >
            <GitHub size="48" />
          </a>
          <a
            href="https://linkedin.com/in/afonsojramos"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.gray}
          >
            <LinkedIn size="46" style={{ padding: '4 4' }} />
          </a>
          <a
            href="https://t.me/afonsojramos"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.gray}
          >
            <Telegram size="46" />
          </a>
          <a
            href="/Curriculum_Vitae_Afonso_Ramos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.gray}
          >
            <CV size="48" style={{ padding: '4 4' }} />
          </a>
        </div>
      </article>
    </Page>
  )
}

export default Contacts
