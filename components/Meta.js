import Head from 'next/head'

export default ({ title }) => (
  <Head>
    <meta charSet='utf-8' />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
    />
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='static/favicons/apple-touch-icon.png'
    />
    <link
      rel='icon'
      type='image/png'
      href='static/favicons/favicon-32x32.png'
      sizes='32x32'
    />
    <link
      rel='icon'
      type='image/png'
      href='static/favicons/favicon-16x16.png'
      sizes='16x16'
    />
    <link rel='manifest' href='static/favicons/manifest.json' />
    <link
      rel='mask-icon'
      href='static/favicons/safari-pinned-tab.svg'
      color='#3f51b5'
    />
    <meta name='msapplication-TileColor' content='#3f51b5' />
    <meta
      name='msapplication-TileImage'
      content='static/favicons/mstile-144x144.png'
    />
    <meta name='theme-color' content='#3f51b5' />
    <title>{title}</title>
    <meta
      description='Linklet as of now contains the links which are shared in whatsapp freeCodeCamp Hyderabad group.'
    />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={title} />
    <meta property='og:url' content='https://linklet.ml' />
    <meta
      property='og:image'
      content='https://res.cloudinary.com/vinaypuppal/image/upload/c_scale,w_600/v1490456906/Screen_Shot_2017-03-25_at_9.01.02_PM_y7dk6j.png'
    />
    <meta property='og:site_name' content='Linklet' />
    <meta
      property='og:description'
      content='Linklet as of now contains the links which are shared in whatsapp freeCodeCamp Hyderabad group.'
    />
  </Head>
)
