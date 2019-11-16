data {
	int<lower=0> w;         // number of weeks to use for training the model
	int<lower=0> s;			// number of stations
	matrix[s, 24*7*w*2] D;  // the recorded bike deltas for 2w weeks
}
transformed data {
	matrix[s, 24*7] means;
	matrix[s, 24*7] vars;

	for (i in 1:s) {
		for (j in 1:(24*7)) {
			real[w] tmp;
			for (k in 0:(w-1)) {
				tmp[k+1] = D[i, k * 24 * 7 +j];
			}
			means[i, j] = mean(tmp);
			vars[i, j] = sd(tmp) * 0.9 + 0.2;
		}
	}
}
parameters {
	matrix[s, 24*7] B;
}
transformed parameters {
}
model {
	to_vector(B) ~ normal(to_vector(means), to_vector(vars));
	for (i in (w+1):(w*2)) {
		to_vector(D[,i]) ~ normal(to_vector(B), to_vector(vars));
	}
}
