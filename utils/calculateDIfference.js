// Calculate the Euclidean distance between two vectors
function calculateDifference(vector1, vector2) {
  if (vector1.length !== vector2.length) {
    throw new Error("Vectors must have the same length");
  }

  // Define weights for genre and numPages
  const genreWeight = 2;
  const numPagesWeight = 1;

  const squaredDifferences = vector1.map((value, index) => {
    const weight = index === 0 ? genreWeight : numPagesWeight;
    return weight * Math.pow(value - vector2[index], 2);
  });

  const sumSquaredDifferences = squaredDifferences.reduce(
    (acc, value) => acc + value,
    0
  );

  return Math.sqrt(sumSquaredDifferences);
}

module.exports = { calculateDifference };
