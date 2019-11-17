data {
	int<lower=0> w;         // number of weeks to use for training the model
	int<lower=0> s;			// number of stations
	matrix[s, 24*7*w*2] D;  // the recorded bike deltas for 2w weeks
	matrix[s, 24*7] means;  // the recorded bike deltas for 2w weeks
	matrix[s, 24*7] vars;  // the recorded bike deltas for 2w weeks
}
transformed data {
}
parameters {
	matrix[s, 24*7] B;
	real trend;
}
transformed parameters {

}
model {
	trend ~ normal(0, 0.1);
	to_vector(B) ~ normal(to_vector(means), to_vector(vars));
	for (i in (w+1):(w*2)) {
		to_vector(D[,((i-1)*24*7+1):(i*24*7)]) ~ normal((i / w * trend + 1) * to_vector(B), to_vector(vars));
	}
}
