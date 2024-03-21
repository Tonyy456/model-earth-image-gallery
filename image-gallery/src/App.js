import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Octokit } from "octokit";
import imageLocations from './image-locations.json'

function App() {
  const [selectedImage, setSelectedImage] = useState(-1);
  const githubImages = useGithubImages();

  const handleExitClick = () => {
    setSelectedImage(-1);
  }
  const handleNext = () => {
    const nextIndex = (selectedImage + 1) % githubImages.length;
    setSelectedImage(nextIndex);
  }
  const handlePrevious = () => {
    const nextIndex = (selectedImage + githubImages.length - 1) % githubImages.length;
    setSelectedImage(nextIndex);
  }
  const handleImageClick = (e,v) => {
    setSelectedImage(e.target.id)
  }

  // have an image selected? switch the screen to that image
  if (selectedImage >= 0) return ( <SelectedImageContainer 
    element={githubImages[selectedImage]} 
    onLeave={handleExitClick}
    onNext={handleNext}
    onPrevious={handlePrevious}
  />)

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className='image-container'>
        {githubImages.map((item, index) => {return (
          <img key={index} id={index} src={item.download_url} alt={item} onClick={handleImageClick}/>
          )})}
      </div>
    </div>
  )
}

function useGithubImages() {
  const [images, setImages] = useState([]);
  const octokit = new Octokit({ });
  const fetchImages = async () => {
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
  useEffect(() => {
    fetchImages();
  },[])
  return images;
}

function BurgerMenu(props) {
  const { imageElement } = props;

  const [file,setFile] = useState();
  useEffect(() => {
    const config = { responseType: 'blob' };
    axios.get(imageElement.download_url, config).then(res => {
      const file = new File([res.data], imageElement.name, {type: res.data.type});
      setFile(file);
    })
  }, [imageElement])

  return (
    <div className='burger-menu'>
      <a href={imageElement.html_url} target="_blank">
        <h3> Image </h3>
      </a>
      <p>name: {imageElement.name}</p>
      <p>size: {imageElement.size}</p>
      { file && 
        <a href={URL.createObjectURL(file)} download>
          <p> Download </p>
        </a>
      }
    </div>
  )
}

function SelectedImageContainer(props) {
  const { element, onLeave, onNext, onPrevious} = props;
  const [burgerOpen, setBurgerOpen] = useState(false);
  return(
    <div className='selected-image-container'>
      <img src={element.download_url} alt=''/>
      <button className='exit-button button-hover ' onClick={onLeave}/>
      <button className='next-button button-hover ' onClick={onNext}/>
      <button className='previous-button button-hover ' onClick={onPrevious}/>
      <button className='open-burger-menu-button button-hover' onClick={() => setBurgerOpen(prev => !prev)}/>
      {burgerOpen && <BurgerMenu imageElement={element} /> }
    </div>
  )
}

export default App