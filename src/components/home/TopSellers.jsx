import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount] = useState(12);

  useEffect(() => {
    async function fetchTopSelles() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
        );
        setTopSellers(data);
      } catch (err) {
        console.error("Error fetching items", err);
      }
      setLoading(false);
    }
    fetchTopSelles();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                <div className="skeleton-top-sellers">
                  {[...Array(skeletonCount)].map((_, index) => (
                    <div key={index} className="skeleton-author-item">
                      <div className="skeleton-author-pp">
                        <div className="skeleton-avatar"></div>
                      </div>
                      <div className="skeleton-author-info">
                        <div className="skeleton-name"></div>
                        <div className="skeleton-price"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                topSellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        <span>{seller.authorName}</span>
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
