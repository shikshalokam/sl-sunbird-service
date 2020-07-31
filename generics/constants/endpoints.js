/**
 * name : api-responses.js
 * author : Aman Karki
 * Date : 20-July-2020
 * Description : All api response messages.
 */

module.exports = {
    GET_RESOURCES: "/api/content/v1/search",
    FRAMEWORK_LIST: "/api/framework/v1/read",
    SUNBIRD_GENERATE_DIALCODE: "/api/dialcode/v1/generate",
    SUNBIRD_PUBLISH_DIALCODE: "/api/dialcode/v1/publish",
    SUNBIRD_DIALCODE_STATUS: "/api/dialcode/v1/read",
    SUNBIRD_CONTENT_LINK: "/api/dialcode/v1/content/link",
    SUNBIRD_PUBLISH_CONTENT: "/api/content/v1/publish",
    SUNBIRD_USER_READ: "/api/user/v1/read",
    SUNBIRD_INDEX_SYNC: "/api/data/v1/index/sync",
    SUNBIRD_CREATE_CONTENT: "/api/content/v1/create",
    SUNBIRD_UPLOAD_CONTENT: "/api/content/v1/upload",
    UPLOAD_TO_GCP: "/cloud-services/gcp/uploadFile",
    UPLOAD_TO_AWS: "/cloud-services/aws/uploadFile",
    UPLOAD_TO_AZURE: "/cloud-services/azure/uploadFile",
    DOWNLOAD_GCP_URL: "/cloud-services/gcp/getDownloadableUrl",
    DOWNLOAD_AWS_URL: "/cloud-services/aws/getDownloadableUrl",
    DOWNLOAD_AZURE_URL: "/cloud-services/azure/getDownloadableUrl",
};
