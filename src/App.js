import React, {useState} from 'react'
import useGithubImages from './hooks/useGithubImages';
import ImageViewer from './components/ImagePageContainer';

/* 
author: Anthony D'Alesandro 
 App() which is an image gallery viewer.
*/
function App() {
  const [selectedImage, setSelectedImage] = useState(-1);
  const githubImages = useGithubImages();

  const handleImageClick = (e,v) => {
    setSelectedImage(e.target.id)
  }
  if (!githubImages || !githubImages.length) return <></>
  // ImageViewer conditionally shows the children element if the element passed is null
  return (
    <ImageViewer 
      element={selectedImage === -1 ? null : githubImages[selectedImage]} 
      onUpdate={(change) => {console.log(change); setSelectedImage(prev => (prev + githubImages.length + change) % githubImages.length)}}
      onExit={() => setSelectedImage(-1)}
    >
      <Gallery elements={githubImages} onImageSelect={handleImageClick} />
      
    </ImageViewer>
  )
}

/*
author: Anthony D'Alesandro

Gallery displays images in a flex format on a page. 250px wide each. Allows an onclick functionality for an image.
*/
function Gallery(props) {
  const {elements, onImageSelect} = props;
  return (<>
    <div className='navbar'>
      <a href='/'>
        <img 
          className='me-logo'
          src='https://model.earth/localsite/img/logo/earth/model-earth.png'/>
      </a>
    </div>
    <div className='image-container'>
      {elements.map((item, index) => {
        console.log(item);
        if(!item.download_url) return <></>
        return (
        <img key={index} id={index} src={item.download_url} alt={''} onClick={onImageSelect}/>
        )})}
    </div>
  </>)
}

export default App