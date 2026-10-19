
function containsNearbyAlmostDuplicate(
    nums: number[],
    indexDiff: number,
    valueDiff: number
): boolean {
    const buckets = new Map<number, number>();
    const width = valueDiff + 1;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const bucketId = Math.floor(num / width);

        // Same bucket means the difference is <= valueDiff
        if (buckets.has(bucketId)) {
            return true;
        }

        // Check adjacent buckets
        if (
            buckets.has(bucketId - 1) &&
            num - buckets.get(bucketId - 1)! <= valueDiff
        ) {
            return true;
        }

        if (
            buckets.has(bucketId + 1) &&
            buckets.get(bucketId + 1)! - num <= valueDiff
        ) {
            return true;
        }

        buckets.set(bucketId, num);

        // Maintain the sliding window
        if (i >= indexDiff) {
            const oldBucketId = Math.floor(nums[i - indexDiff] / width);
            buckets.delete(oldBucketId);
        }
    }

    return false;
}
