import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Easy to Use</>,
    description: (
      <>
        Civet takes care of the data handling. All you have to do is to bring it
        to the screen.
      </>
    ),
  },
  {
    title: <>Flexible</>,
    description: (
      <>
        Civet leaves the connection of the data source to you, allowing you to
        integrate nearly any backend.
      </>
    ),
  },
  {
    title: <>Powered by React</>,
    description: (
      <>
        Civet's functionality is accessible by React components and hooks, which
        makes it super easy to integrate it in your environment.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
            &nbsp; {/* ??? */}
            <Link
              className={classnames(
                "button button--outline button--secondary button--lg",
                styles.apiReference
              )}
              to={useBaseUrl("docs/api")}
            >
              API Reference
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <div className="container">
          <div className="row">
            <div className="col col--6 col--offset-3 padding-vert--lg">
              <h2>Learn How</h2>
              <p>
                The resource component is used to access your data, which you
                can then hand over to your display components.
                <br />
                <a href={useBaseUrl("/docs/api-core#resource")}>
                  Resource reference
                </a>
              </p>
              <img src={useBaseUrl("img/example-simple.png")} alt="Learn How" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2 padding-vert--lg">
              <h2>Try it Out</h2>
              <iframe
                width="100%"
                height="500px"
                src="https://codesandbox.io/embed/civet-demo-l22kk8mj3m?autoresize=1&fontsize=14"
                frameborder="0"
                title="Civet Demo"
                style={{
                  width: "100%",
                  height: "500px",
                  border: 0,
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
