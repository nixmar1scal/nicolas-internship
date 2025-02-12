import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AutoPlay from "../UI/AutoPlay";
import { Link } from "react-router-dom";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setCollections(data);
      console.log(data);
    }
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <AutoPlay collections={collections}/>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
