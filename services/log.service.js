import logger from "pino"

function trace(obj, msg, value) {
    logger().trace(obj, msg, value)
}

function debug(obj, msg, value) {
    logger().debug(obj, msg, value)
}

function info(obj, msg, value) {
    logger().info(obj, msg, value)
}

function warn(obj, msg, value) {
    logger().warn(obj, msg, value)
}

function error(obj, msg, value) {
    logger().error(obj, msg, value)
}

function fatal(obj, msg, value) {
    logger().fatal(obj, msg, value)
}

export const logService = {
    trace, debug, info, warn, error, fatal
};