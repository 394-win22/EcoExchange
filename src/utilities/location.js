
const userToItem = (userLoc, itemLat, itemLong) => {
    return computeDist(userLoc, {latitude: itemLat, longitude: itemLong});
}

const computeDist = (pos1, pos2) => {
    const latdiff = abs(pos1.latitude - pos2.latitude);
    const longdiff = abs(pos1.longitude - pos2.longitude);

    return Math.sqrt(latdiff*latdiff + longdiff*longdiff);
};

export { userToItem };