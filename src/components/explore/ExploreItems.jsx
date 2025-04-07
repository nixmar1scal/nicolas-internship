import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
        );
        setNfts(data);
      } catch (err) {
        console.error("Error fetching items", err);
      }
      setLoading(false);
    }
    fetchNFTs();
  }, []);

  useEffect(() => {
    if (nfts.length === 0) return;

    const sortedNfts = [...nfts].sort((a, b) => {
      switch (sortOption) {
        case "price_low_to_high":
          return a.price - b.price;
        case "price_high_to_low":
          return b.price - a.price;
        case "likes_high_to_low":
          return b.likes - a.likes;
        case "ending_soon":
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        default:
          return a.id - b.id;
      }
    });

    setNfts(sortedNfts);
  }, [sortOption, nfts.lenght]);

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
          disable={loading}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
          <option value="ending_soon">Ending Soon</option>
        </select>
      </div>
      {nfts.slice(0, visibleCount).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
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
              <Link to={`/item-details${item.id}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details${item.id}`}>
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
      {!loading && visibleCount < nfts.lengh && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
