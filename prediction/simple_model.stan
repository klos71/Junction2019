data {
	int<lower=0> w;         // number of weeks to use for training the model
	int<lower=0> s;			// number of stations
	real D[s, 24*7*w*2];    // the recorded bike deltas for 2w weeks
}
transformed data {
	real means[s, 24*7];
	real vars[s, 24*7];

	for (i in 1:s) {
		for (j in 1:24*7) {
			means[i, j] = mean(D[i, (0:(n-1))*24*7 + j]);
			vars[i, j] = sd(D[i, (0:(n-1))*24*7 + j]) * 0.9 + 0.2;
		}
	}
}
parameters {
	real B[s, 24*7];
}
transformed parameters {
}
model {
	to_vector(B) ~ normal(to_vector(means), to_vector(vars));
	for (i in (w+1):(w*2)) {
		to_vector(D[,i]) ~ normal(to_vector(B), to_vector(vars));
	}
}