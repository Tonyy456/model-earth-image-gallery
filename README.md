# model-earth-image-gallery
author: Anthony D'Alesandro  
  
model-earth-image-gallery is a react built application that makes a request to a specific github repo and renders all the images stored at that repository.

# Warning
I cant say for sure that the github token wont be exposed and easily caught by an attacker. proceed with caution.

# Config / Setup
### .env file
./image-gallery/.env
```env
REACT_APP_GITHUB_ACCESS_TOKEN=""
```

### configure github image folder endpoint file
./image-gallery/src/image-locations.json  
```json
{
    "locations": [
        {
            "owner": "ModelEarth",
            "repo": "replicate",
            "folderPath": "/images"
        },
        {
            "owner": "Tonyy456",
            "repo": "replicate",
            "folderPath": "/images"
        }
    ]
}
```

# Running the Application
install the application
```sh
npm i
```

start the server
```sh
npm run start
```

# Build for development
***NOT TESTED***
```sh
npm run build
```
