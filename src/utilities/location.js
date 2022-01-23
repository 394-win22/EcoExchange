
const degreesToMiles = 51; // number of miles in a degree

const userToItem = (userLoc, itemLat, itemLong) => {
    return computeDist(userLoc ? userLoc.coords : null, {latitude: itemLat, longitude: itemLong});
}

const computeDist = (pos1, pos2) => {
    if (!pos1 || !pos2) return 0;
    const latdiff = Math.abs(pos1.latitude - pos2.latitude);
    const longdiff = Math.abs(pos1.longitude - pos2.longitude);

    return (degreesToMiles * Math.sqrt(latdiff*latdiff + longdiff*longdiff)).toFixed(2);
};

export { userToItem };