import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetail, setItemDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItemDetail(data);
      } catch (err) {
        console.error("Error fetching item", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton height={400} />
                ) : (
                  <img
                    src={itemDetail.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? <Skeleton width={300} /> : itemDetail.title}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width={30} /> : itemDetail.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width={30} /> : itemDetail.likes}
                    </div>
                  </div>
                  <p>
                    {loading ? (
                      <>
                        <Skeleton count={3} />
                      </>
                    ) : (
                      itemDetail.description
                    )}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            {loading ? (
                              <Skeleton circle height={50} width={50} />
                            ) : (
                              <img
                                className="lazy"
                                src={itemDetail.ownerImage}
                                alt=""
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <Link to="/author">{itemDetail.ownerName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            {loading ? (
                              <Skeleton circle height={50} width={50} />
                            ) : (
                              <img
                                className="lazy"
                                src={itemDetail.creatorImage}
                                alt=""
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <Link to="/author">{itemDetail.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (
                        <Skeleton width={50} />
                      ) : (
                        <span>{itemDetail.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

