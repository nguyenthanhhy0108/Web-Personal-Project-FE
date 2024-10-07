import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

def run():
    # Generate synthetic data
    n = 1
    mu = 0
    std = 1  # Standard deviation
    x = np.random.normal(loc=mu, scale=std, size=(n, 1))

    # Hypotheses:
    # H_0: mu_2 = 0   vs.   H_1: mu_2 != 0

    # Construct test-statistic
    t_statistic, p_value = stats.ttest_1samp(x, 0)

    return p_value


if __name__ == '__main__':

    # Exercise 1: Code to compute a single p_value
    p_value = run()
    print(f"Single p-value: {p_value}")

    # Exercise 2: Compute the false positive rate with 1000 iterations
    max_iteration = 1000
    p_values = []
    alpha = 0.05  # Significance level

    for _ in range(max_iteration):
        p = run()
        p_values.append(p)

    p_values = np.array(p_values)

    # False positive rate (reject H_0 when H_0 is true)
    false_positive_rate = np.mean(p_values < alpha)
    print(f"False positive rate: {false_positive_rate * 100}%")

    # Exercise 3: Plot the distribution of the p_value
    plt.hist(p_values, bins=30, edgecolor='black', alpha=0.7)
    plt.axvline(x=alpha, color='red', linestyle='--', label=f'alpha = {alpha}')
    plt.title('Distribution of p-values')
    plt.xlabel('p-value')
    plt.ylabel('Frequency')
    plt.legend()
    plt.show()
