data {
	int<lower=0> n;         // number of weeks to use for training the model
	real D[n*2, 24*7];      // the recorded bike deltas for 2n weeks
}
transformed data {
	real means[24*7];
	real vars[24*7];

	for (i in 1:24*7) {
		means[i] = mean(D[1:n, i]);
		vars[i] = sd(D[1:n, i]);
	}
}
parameters {
	real B[24*7];
}
transformed parameters {
}
model {
	B ~ normal(means, vars);
	for (i in (n+1):(n*2)) {
		D[i,] ~ normal(B, vars);
	}
}