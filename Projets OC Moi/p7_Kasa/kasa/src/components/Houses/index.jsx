import { Link } from "react-router-dom";
import { housing } from "../../data/housing";

function Houses(){
    return(
        <>
            <div className="house-container">
                {housing.map((data, key) => {
                return (
                    <Link to={"/details?id=" + data.id} className="houseDetailLink" key={key}>
                    <div className='house-cover' style={{backgroundImage: `url(${(data.cover)})`}}>
                        <span className='house-cover-title'>{data.title}</span>
                    </div>
                    </Link>                    
                );
                })}
      </div>
        </>
    )
}

export default Houses;