import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import Checkbox from "../Checkbox/Checkbox";
import { fetchAll } from "../../assets/FetchServices/Video";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page containing onboarding videos to be watched.
 * 
 * Props:
 * - prev<Function>: Function provided by the parent component to transition to the previous page.
 *      Syntax: previous()
 * 
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - save<Function>: Function provided by the parent component to save the onboarding status and navigate to the 
 *      application's homepage.
 *      Syntax: save()
 * 
 * - watchedVideos<Boolean>: Flag determining whether the user has declared that s/he has watched all the videos.
 * 
 * - setWatchedVideos<Function>: Function provided by the parent component to set the watchedVideos flag.
 *      Syntax: setWatchedVideos(<Boolean>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingVideos({prev, next, save, watchedVideos, setWatchedVideos, style}) {
    //Videos to be displayed
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    //Function for retrieving the onboarding videos
    function getVideos() {
        fetchAll().then((data) => setVideos(data));
    };

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "113px",
            paddingY: "44px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>Watch below videos</h4>
            <p style={{textAlign: "center", marginBottom: "50px"}}>
                You can watch the videos in any browser or pdf viewer.
            </p>
            {/*Content*/}
            {videos.map((video) => (
                <>
                    <h5 style={{textAlign: "center", marginBottom: "10px"}}>{video.title}</h5>
                    <iframe 
                        width="560" 
                        height="315"
                        title={video.title}
                        src={video.src}
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                        style={{display: "block", margin: "0 auto 50px"}}
                    ></iframe>
                </>
            ))}
            <Stack direction="row" alignItems="center" spacing={1} sx={{marginBottom: "30px"}}>
                <Checkbox 
                    type="checkbox" 
                    id="watchedVideos" 
                    name="watchedVideos" 
                    value="watchedVideos"
                    size="large" 
                    checked={watchedVideos}
                    onChange={() => setWatchedVideos(!watchedVideos)}
                />
                <p>I have watched the videos.<span style={{color: "red"}}>*</span></p>
            </Stack>
            {/*Buttons*/}
            <Stack direction="row" alignContent="center" justifyContent="space-between">
                <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={prev}>Previous</HRMButton>
                <Stack direction="row" alignContent="center" spacing={2}>
                    <HRMButton 
                        mode="secondaryB" 
                        onClick={save}
                    >
                        Save and complete later
                    </HRMButton>
                    <HRMButton mode="primary" enabled={watchedVideos} onClick={next}>Save and next</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingVideos.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //Flag determining whether the user has declared that s/he has watched all the videos
    watchedVideos: PropTypes.bool,

    //Function for setting the watchedVideos flag
    setWatchedVideos: PropTypes.func
};

//Default values for this component
OnboardingVideos.defaultProps = {
    style: {}
};