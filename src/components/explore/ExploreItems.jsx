import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(4);

  useEffect(() => {
    const updateSkeletonCount = () => {
      if (window.innerWidth < 768) setSkeletonCount(4);
      else if (window.innerWidth < 1024) setSkeletonCount(6);
      else setSkeletonCount(8);
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);

  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);
        const url = sortOption 
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOption}`
          : 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';
        
        const { data } = await axios.get(url);
        setNfts(data);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [sortOption]);

  const handleFilterChange = (e) => {
    setSortOption(e.target.value);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, nfts.length));
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          className="form-select"
          value={sortOption}
          onChange={handleFilterChange}
          disabled={loading}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
          <option value="ending_soon">Ending Soon</option>
        </select>
      </div>

      {loading ? (
        <div className="skeleton-explore-items">
          {[...Array(skeletonCount)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {nfts.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown item={item} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/author/${item.authorId}/items-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/author/${item.authorId}/items-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && visibleCount < nfts.length && (
        <div className="col-md-12 text-center mt-4">
          <button onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
