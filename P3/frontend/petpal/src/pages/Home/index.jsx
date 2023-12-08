import "./style.css"

const Home = () => {

    return <>
      <div className="searchBar">
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </form>
        </div>
    </>;
}

export default Home