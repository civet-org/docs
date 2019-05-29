/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ""}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : "") + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} alt="Project Logo" />
  </div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || "";
    return (
      <SplashContainer>
        <Logo img_src={imgUrl("civet-square.png")} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl("getting-started.html", this.props.language)}>
              Getting Started
            </Button>
            <Button href={docUrl("api.html", this.props.language)}>
              API Reference
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={["bottom", "top"]}
    id={props.id}
    background={props.background}
  >
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = () => (
  <Block layout="fourColumn">
    {[
      {
        content:
          "Civet takes care of the data handling. All you have to do is to bring it to the screen.",
        // image: imgUrl("civet.png"),
        imageAlign: "top",
        title: "Easy to use"
      },
      {
        content:
          "Civet leaves the connection of the data source to you, allowing you to integrate nearly any backend.",
        // image: imgUrl("civet.png"),
        imageAlign: "top",
        title: "Flexible"
      }
    ]}
  </Block>
);

const LearnHow = ({ language }) => (
  <Block background="light">
    {[
      {
        content: `The resource component is used to access your data, which you can then hand over to your display components.<br/>
          [Resource reference](${docUrl("api-core#resource", language)})`,
        image: imgUrl("example-simple.png"),
        imageLink: imgUrl("example-simple.png"),
        button: "test",
        imageAlign: "right",
        title: "Learn How"
      }
    ]}
  </Block>
);

const TryOut = () => (
  <React.Fragment>
    <Block id="try">
      {[
        {
          content: siteConfig.embeddedSandbox,
          title: "Try it Out"
        }
      ]}
    </Block>
  </React.Fragment>
);

// const Description = () => (
//   <Block background="dark">
//     {[
//       {
//         content: "This is another description of how this project is useful",
//         image: imgUrl("civet.png"),
//         imageAlign: "right",
//         title: "Description"
//       }
//     ]}
//   </Block>
// );

// const Showcase = props => {
//   if ((siteConfig.users || []).length === 0) {
//     return null;
//   }

//   const showcase = siteConfig.users
//     .filter(user => user.pinned)
//     .map(user => (
//       <a href={user.infoLink} key={user.infoLink}>
//         <img src={user.image} alt={user.caption} title={user.caption} />
//       </a>
//     ));

//   return (
//     <div className="productShowcaseSection paddingBottom">
//       <h2>Who is Using This?</h2>
//       <p>This project is used by all these people</p>
//       <div className="logos">{showcase}</div>
//       <div className="more-users">
//         <a className="button" href={pageUrl("users.html", props.language)}>
//           More {siteConfig.title} Users
//         </a>
//       </div>
//     </div>
//   );
// };

class Index extends React.Component {
  render() {
    const language = this.props.language || "";

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow language={language} />
          <TryOut />
          {/* <Showcase language={language} /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
