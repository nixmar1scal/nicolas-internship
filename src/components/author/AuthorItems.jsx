import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ author }) => {
  if (!author?.nftCollection || author.nftCollection.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {author.nftCollection.map((items) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={items.id}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={author.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                  <Link to={`items-details/${items.nftId}`}>
                    <img
                      src={items.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`items-details/${items.nftId}`}>
                    <h4>{items.title}</h4>
                  </Link>
                  <div className="nft__item_price">{items.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
