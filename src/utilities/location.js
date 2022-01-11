
const userToItem = (userLoc, itemLat, itemLong) => {
    return computeDist(userLoc, {latitude: itemLat, longitude: itemLong});
}

const computeDist = (pos1, pos2) => {
    const latdiff = Math.abs(pos1.lat - pos2.lat);
    const longdiff = Math.abs(pos1.long - pos2.long);

    return Math.sqrt(latdiff*latdiff + longdiff*longdiff);
};

export { userToItem };