import {memo} from "react";
import {FaYoutube} from "react-icons/fa6";

import "./YoutubeLink.css"

export const YoutubeLink = memo(({ watchId }) =>
    <a href={`https://youtube.com/watch?v=${watchId}`} className="youtube" target="_blank">
        <FaYoutube/>
        Video
    </a>
)