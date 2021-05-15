import React, { useEffect } from "react";
import {Metadata, Repository} from "../services/repository";

function HomePage() {
    useEffect(() => {
        let rep: Repository = new Repository();
        rep.UpsertMetadata(new Metadata());
    }, []);

    return (
       <div className="container fluid text-white mt-20 md:text-3xl">
           This is the Home Page Component in /homepage
       </div>
    );
}

export default HomePage;
