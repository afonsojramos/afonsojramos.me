import Page from '@components/page'

const Contacts = () => {
  return (
    <Page title="Contacts" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch.</p>

        <blockquote>
          <a
            href="mailto:afonsojorgeramos@gmail.com?subject=Hello"
            className="reset"
          >
            afonsojorgeramos@gmail.com
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contacts
