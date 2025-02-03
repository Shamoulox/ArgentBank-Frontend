
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Feature from "../components/Feature";
import '../styles/main.css';


function Home() {
  return (
    <>
      <NavBar />
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
        <Feature
        imgSrc="/img/icon-chat.png"
        imgAlt="Chat Icon"
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Feature
        imgSrc={"/img/icon-money.png"}
        imgAlt={"Chat Icon"}
        title={"More savings means higher rates"}
        description={"The more you save with us, the higher your interest rate will be!"}
        />
        <Feature
        imgSrc={"/img/icon-security.png"}
        imgAlt={"Chat Icon"}
        title={"Security you can trust"}
        description={"We use top of the line encryption to make sure your data and money is always safe."}
        />
        </section>
      </main>
      <Footer title ="bonjour" description="autre chose" />
    </>
  );
}
export default Home;

