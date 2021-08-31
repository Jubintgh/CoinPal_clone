const About = () => {

    return(
        <div className="about-section">
            <h1>About</h1>
            <p>Summary</p>
            <p>
                Coin Pal is inspired by paypal based on the idea of a Peer to Peer blockchain economy. The main purpose of the app is to faciliate the transfer of crypto between the users without the need to include the wallet hash with each transaction(similar to Venmo). This is a concept app and no real Crypto is being used. The front end of this application was made with React and it follows Redux architecture. The backend was developed using Flask and PostgresSQL. The APIs are designed around REST principles. The final touch and design was also created using raw CSS.
            </p>
            <h2>About me</h2>
            <div className="row">
            <div className="column">
                <div className="card">
                <img src="https://avatars.githubusercontent.com/u/73211975?v=4" alt="jay" id='profile-img'/>
                <div className="container">
                    <h2>Jubin Taghdir</h2>
                    <p>Software engineer</p>
                    <h5>Jay</h5>
                    <p>As a Business Information Systems(MIS) undergraduate I've always been interested in the world of computers and its direct effect on the economy, society and culture. Throughout my experience Developing Software, I've had experience building dynamic web applications as well as Windows applications both in JavaScript, Node.js, PostgreSQL, React, Redux and HTML/CSS as well as C#, .NET, Windows Forms and Microsoft SQL Server. I mostly enjoy the thrill of solving a problems and bringing far fetched ideas to life and most importantly, my background in the financial/service industry has thought me the best results only come through when a problem has been tackled through teamwork and the insights of a diverse group of people.</p>
                    <p><button className="button">Contact</button></p>
                </div>
                </div>
            </div>

            {/* <div className="column">
                <div className="card">
                <div className="container">
                    <h2>Mike Ross</h2>
                    <p className="title">Art Director</p>
                    <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                    <p>mike@example.com</p>
                    <p><button className="button">Contact</button></p>
                </div>
                </div>
            </div> */}

            {/* <div className="column">
                <div className="card">
                <div className="container">
                    <h2>John Doe</h2>
                    <p className="title">Designer</p>
                    <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                    <p>john@example.com</p>
                    <p><button className="button">Contact</button></p>
                </div>
                </div>
            </div> */}
            </div>
            </div>

    )
}

export default About