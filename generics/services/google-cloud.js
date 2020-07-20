/**
 * name : google-cloud.js
 * author : Aman Jung Karki
 * created-date : 23-feb-2020
 * Description : All google cloud related functionality
 */

// Dependencies
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "shikshalokam",
  keyFilename:
  PROJECT_ROOT_DIRECTORY + process.env.GCP_PATH
});

/**
  * Upload file in google cloud.
  * @function
  * @name uploadFile
  * @param file - file to upload.
  * @param filePath - file path
  * @returns {Object} - upload file information
*/

const uploadFile = ( fileName,filePath,bucketName ) => {
  return new Promise(async (resolve,reject)=>{
      try {

          const gcpBucket = storage.bucket(bucketName);

          const uploadedFile = await gcpBucket.upload(fileName,
            {
                destination: filePath,
                gzip : true,
                metadata : {}
            }
          );

          return resolve(
            uploadedFile[0].metadata
          );

      } catch(err) {
          return reject(err);
      }
  })
}

/**
  * Get download lik for google cloud data.
  * @function
  * @name downloadUrl
  * @param fileName - Name of the file name.
  * @returns {String} - Url link
*/

const getDownloadableUrl = ( filename,bucketName) =>{
  return new Promise(async (resolve,reject)=>{
    try {

      const gcpBucket = storage.bucket(bucketName);
      const downloadableUrl = await gcpBucket.file(filename).getMetadata();
      return resolve(downloadableUrl[0].mediaLink);
      
    } catch(err){
      return reject(err);
    }
  })
}

/**
 * Get google cloud signed url.
 * @method
 * @name signedUrl
 * @param {String} fileName  - name of the file.
 * @param {String} bucketName - name of the bucket.  
 * @returns {Object} - signed url and gcp file name. 
 */

let signedUrl = ( fileName , bucketName ) => {
  return new Promise(async (resolve, reject) => {
    try {

      const myBucket = storage.bucket(bucketName);
      
      if( fileName == "" ) {
        throw new Error(httpStatusCode.bad_request.status);
      }
      
      const noOfMinutes = constants.common.NO_OF_MINUTES;
      const expiry = Date.now() + noOfMinutes * constants.common.NO_OF_EXPIRY_TIME * 1000;
      
      const config = {
        action: 'write',
        expires: expiry,
        contentType: 'multipart/form-data'
      };
      
      const gcpFile = myBucket.file( fileName );
      const signedUrl = await gcpFile.getSignedUrl(config);

      const result = {
        success : true,
        url : signedUrl[0]
      };
      
      if(signedUrl[0] && signedUrl[0] != "") {
        result["name"] = gcpFile.name;
      } else {
        result ["success"] = false;
        result["url"] = signedUrl;
      }

      return resolve(result);

    } catch (error) {
      return reject(error);
    }
  })
}

module.exports = {
    uploadFile: uploadFile,
    getDownloadableUrl : getDownloadableUrl,
    signedUrl : signedUrl
};
