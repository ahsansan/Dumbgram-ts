import LeftMenu from "../components/Profile/LeftMenu";
import Header from "../components/Header/Header";
import ExplorePost from "../components/Explore/ExplorePost";

function ExplorePage() {
  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <LeftMenu />
        </div>
        <div className="home-right">
          <div>
            <div>
              <ExplorePost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
