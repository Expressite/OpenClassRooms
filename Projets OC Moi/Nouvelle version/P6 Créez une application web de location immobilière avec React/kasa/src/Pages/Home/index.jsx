import Houses from "../../components/Houses"
function Home() {
    return(
        <div>
            <div className="mainHeader">
                <div className="textHeader"><span>Chez vous,</span><span className="headerSecondPart"> partout et ailleurs</span></div>
            </div>            
            <Houses></Houses>
        </div>
    );
}

export default Home;