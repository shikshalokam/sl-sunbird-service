/**
 * name : files/helper.js
 * author : Aman Jung Karki
 * created-date : 11-Feb-2020
 * Description : All files related helper functionality.Including uploading file
 * to cloud service.
 */

// Dependencies
const Zip = require('adm-zip');
const fs = require('fs');

const kendraService = require(GENERIC_SERVICES_PATH + '/kendra');

/**
 * FilesHelper
 * @class
 */

module.exports = class FilesHelper {
  /**
   * Upload file in different services based on cloud storage provide.
   * @method
   * @name upload
   * @param  {file}  - file to upload.
   * @param  {filePathForBucket}  - file path where the file should upload.
   * @param {String} - bucketName
   * @param {String} - storage - name of the cloud storage 
   * @returns {json} Response consists of links of uploaded file.
   */

  static upload(file, filePathForBucket, bucketName, storage = "") {
    return new Promise(async (resolve, reject) => {
      try {

        let deleteFile = false;
        let filePath;
        if (file && file.data && file.name) {
          deleteFile = true;
          let tempPath = CONSTANTS.common.UPLOAD_FOLDER_PATH;
          if (!fs.existsSync(`${PROJECT_ROOT_DIRECTORY}${tempPath}`)) {
            fs.mkdirSync(`${PROJECT_ROOT_DIRECTORY}${tempPath}`)
          }

          let uniqueId = UTILS.generateUniqueId();
          let fileName = uniqueId + file.name;
          filePath = `${PROJECT_ROOT_DIRECTORY}${tempPath}` + '/' + fileName;
          fs.writeFileSync(filePath, file.data);
          file = filePath;

        }

        let result = await kendraService.uploadFile(file, filePathForBucket);

        if (deleteFile) {
          _removeFiles(filePath);
        }
        return resolve(result)
      } catch (error) {
        return reject(error)
      }
    })
  }

  /**
   * Get downloadable url
   * @method
   * @name getDownloadableUrl
   * @param  {filePath}  - File path.
   * @param  {String}  - Bucket name
   * @param  {String}  - Storage name
   * @return {String} - Downloadable url link
   */

  static getDownloadableUrl(filePath, bucketName, storageName = '') {
    return new Promise(async (resolve, reject) => {
      try {

        if (Array.isArray(filePath) && filePath.length > 0) {
          let result = []

          await Promise.all(
            filePath.map(async element => {
              let responseObj = {}
              responseObj.filePath = element
              responseObj.url = await kendraService.getDownloadableUrls(filePath);

              result.push(responseObj)
            })
          )

          return resolve(result)
        } else {

          let result = await kendraService.getDownloadableUrls(filePath);

          let responseObj = {
            filePath: filePath,
            url: result
          }

          return resolve(responseObj)
        }
      } catch (error) {
        return reject(error)
      }
    })
  }

  /**
   * Unzip file
   * @method
   * @name unzip
   * @param  {String} zipFilePath - Path of zip file.
   * @param  {String} folderToUnZip - Path where file should be unziped.
   * @param  {String} deleteExistingZipFile - delete the existing zip file.
   * @return {Object} - Save unzipped file
   */

  static unzip(zipFilePath, folderToUnZip, deleteExistingZipFile) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!fs.existsSync(`${PROJECT_ROOT_DIRECTORY}${process.env.ZIP_PATH}`)) {
          fs.mkdirSync(`${PROJECT_ROOT_DIRECTORY}${process.env.ZIP_PATH}`)
        }

        const zip = new Zip(zipFilePath)

        zip.extractAllTo(folderToUnZip, true)

        if (deleteExistingZipFile) {
          fs.unlinkSync(zipFilePath)
        }

        return resolve({
          success: true
        })
      } catch (error) {
        return resolve({
          success: false
        })
      }
    })
  }

  /**
   * zip a folder
   * @method
   * @name zip
   * @param  {String} existingName - existing file name.
   * @param  {String} newFileName - new file name to set
   * @return {Object} - Save unzipped file
   */

  static zip(existing, newFolder) {
    return new Promise(async (resolve, reject) => {
      try {
        const zip = new Zip()

        zip.addLocalFolder(existing)
        zip.writeZip(newFolder)

        return resolve({
          success: true
        })
      } catch (error) {
        return resolve({
          success: false
        })
      }
    })
  }

  /**
   * Rename file name
   * @method
   * @name rename
   * @param  {String} existingName - existing file name.
   * @param  {String} newFileName - new file name to set
   * @return {Object} - Save unzipped file
   */

  static rename(existingName, newFileName) {
    return new Promise(async (resolve, reject) => {
      try {
        fs.rename(existingName, newFileName, function (err) {
          if (err) {
            return resolve({
              success: false
            })
          } else {
            return resolve({
              success: true
            })
          }
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

  /**
   * Save zip file in public zip folder
   * @method
   * @name saveZipFile
   * @param  {String} zipFileName  - name of zip file.
   * @param  {String}  zipFileData
   * @return {Object} - Save zip file data.
   */

  static saveZipFile(name, data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!fs.existsSync(`${PROJECT_ROOT_DIRECTORY}${process.env.ZIP_PATH}`)) {
          fs.mkdirSync(`${PROJECT_ROOT_DIRECTORY}${process.env.ZIP_PATH}`)
        }

        let zipFileName = `${PROJECT_ROOT_DIRECTORY}${process.env.ZIP_PATH}/${name}`

        fs.writeFile(zipFileName, data, async function (err) {
          if (err) {
            return resolve({
              success: false
            })
          } else {
            return resolve({
              success: true
            })
          }
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

  /**
   * Remove folder recursively
   * @function
   * @name removeFolder
   * @param path - folder path.
   * @returns {Promise}
   */

  static removeFolder(path) {
    _removeFolder(path)
    return
  }

}


/**
 * Remove folder recursively
 * @function
 * @name _removeFolder
 * @param path - folder path.
 * @return
 */

function _removeFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var currentPath = path + '/' + file
      if (fs.lstatSync(currentPath).isDirectory()) {
        // recurse
        _removeFolder(currentPath)
      } else {
        // delete file
        fs.unlinkSync(currentPath)
      }
    })
    fs.rmdirSync(path)
  }
}


/**
 * Remove file
 * @function
 * @name _removeFiles
 * @param filePath -  path of the file.
 * @return
 */

function _removeFiles(filePath) {

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  return;
}
