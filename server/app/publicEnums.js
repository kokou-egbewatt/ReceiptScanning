const ImageScan_STATUS_CODES = {
    REQUEST_OK: 200,
    REQUEST_ERROR: 101
}
const ImageScan_STATUS_MESSAGES = {
    REQUEST_OK: "Smooth sailing",
    ASSERTION_ERR: "code Assertion Error, Check Logs",
    INTERNAL_SERVER_ERROR: "Error while processing request"
}

export default {
    ImageScan_STATUS_CODES,
    ImageScan_STATUS_MESSAGES
}