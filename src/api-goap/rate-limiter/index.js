class RateLimiter {
  constructor() {
    this.standardPool = {
      limit: 2,
      interval: 1000, // 1 second
      tokens: 2,
      lastRefill: Date.now()
    };

    this.burstPool = {
      limit: 10,
      interval: 10000, // 10 seconds
      tokens: 10,
      lastRefill: Date.now()
    };

    this.queue = [];
  }

  enqueueRequest(request) {
    const currentTime = Date.now();
    this.refillTokens(this.standardPool, currentTime);
    this.refillTokens(this.burstPool, currentTime);

    if (this.standardPool.tokens > 0) {
      this.executeRequest(request.url, request.parameters, this.standardPool);
    } else if (this.burstPool.tokens > 0) {
      this.executeRequest(request.url, request.parameters, this.burstPool);
    } else {
      this.queue.push(request);
    }
  }

  async executeRequest(url, parameters, pool) {
    pool.tokens--;
    console.log(`Sending request: ${url} : ${parameters}`);
    return await fetch(url, parameters);
  }

  processQueue() {
    if (this.queue.length === 0) {
      return;
    }

    const currentTime = Date.now();
    this.refillTokens(this.standardPool, currentTime);
    this.refillTokens(this.burstPool, currentTime);

    const request = this.queue.shift();
    if (this.standardPool.tokens > 0) {
      this.executeRequest(request.url, request.parameters, this.standardPool);
    } else if (this.burstPool.tokens > 0) {
      this.executeRequest(request.url, request.parameters, this.burstPool);
    } else {
      this.queue.unshift(request); // Re-add the request to the beginning of the queue
    }
  }

  refillTokens(pool, currentTime) {
    const timeSinceLastRefill = currentTime - pool.lastRefill;
    if (timeSinceLastRefill >= pool.interval) {
      pool.tokens = pool.limit;
      pool.lastRefill = currentTime;
    }
  }
}

export default RateLimiter;
