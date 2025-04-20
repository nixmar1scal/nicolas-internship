import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonAuthor = () => {
  return (
    <section aria-label="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <Skeleton circle width={120} height={120} />

                  <div className="profile_name mt-3">
                    <h4>
                      <Skeleton width={200} height={20} />
                      <span className="profile_username">
                        <Skeleton width={120} height={15} />
                      </span>
                      <span className="profile_wallet d-block mt-2">
                        <Skeleton width={250} height={15} />
                      </span>
                      <Skeleton
                        width={60}
                        height={25}
                        style={{ marginTop: 10, borderRadius: "6px" }}
                      />
                    </h4>
                  </div>
                </div>
              </div>

              <div className="profile_follow de-flex">
                <div className="de-flex-col text-right">
                  <div className="profile_follower mb-2">
                    <Skeleton width={100} height={20} />
                  </div>
                  <Skeleton
                    width={100}
                    height={40}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 mt-5">
            <div className="row">
              {[1, 2, 3, 4].map((_, i) => (
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
                  <div className="nft__card">
                    <div className="d-flex align-items-center mb-2">
                      <Skeleton circle width={30} height={30} />
                    </div>

                    <Skeleton height={200} style={{ borderRadius: "10px" }} />

                    <div className="mt-3">
                      <Skeleton width={100} height={18} />
                      <Skeleton width={60} height={14} className="mt-1" />
                    </div>

                    <div className="mt-2 text-right">
                      <Skeleton width={40} height={15} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonAuthor;
