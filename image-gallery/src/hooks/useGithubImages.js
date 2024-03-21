import {useState, useEffect} from 'react'
import { Octokit } from 'octokit';
import imageLocations from '../image-locations.json'

/*
author: Anthony D'Alesandro

hook with the sole purposes of extracting data out of use given image-locations.json file and grabbing that data from github.
*/
function useGithubImages() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        async function onLoad() {
            const octokit = new Octokit({
                auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
            });
            for(let i = 0; i < imageLocations.locations.length; i++) {
                const location = imageLocations.locations[i];
                const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                    owner: location.owner,
                    repo: location.repo,
                    path: location.folderPath,
                    headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                const imageArr = response.data;
                setImages(prev => prev.concat(imageArr));
            }
        }
        onLoad();
    },[])
    return images;
}

export default useGithubImages