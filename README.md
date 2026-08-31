# DevOps with Kubernetes 2026

## Exercises

| Chapter 2 | Chapter 3 | Chapter 4 | Chapter 5 |
|---|---|---|---|
| [1.1](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.1/log_output) | [2.1](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.1/log_output) | [3.1](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.1/ping_pong) | [4.1](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/4.1/log_output) |
| [1.2](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.2/the_project) | [2.2](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.2/the_project) | [3.2](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.2/log_output) | [4.2](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/4.2/the_project) |
| [1.3](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.3/log_output) | [2.3](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.3/log_output) | [3.3](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.3/log_output) |
| [1.4](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.4/the_project) | [2.4](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.4/the_project) |[3.4](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.4/ping_pong) | [4.4](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/4.4/ping_pong) |
| [1.5](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.5/the_project) | [2.5](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.5/log_output) |[3.5](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.5/the_project) | [4.5](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/4.5/the_project)
| [1.6](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.6/the_project) | [2.6](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.6/the_project) | [3.6](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.6/the_project) |
| [1.7](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.7/log_output) | [2.7](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.7/ping_pong) | [3.7](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.7/.github/workflows) |
| [1.8](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.8/the_project) | [2.8](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.8/the_project) | [3.8](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.8/.github/workflows) |
| [1.9](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.9/ping_pong) | [2.9](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.9/the_project) | [3.9](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.9) |
| [1.10](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.10/log_output) | [2.10](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/2.10/the_project) | [3.10](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.10/the_project) |
| [1.11](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.11/log_output) | | [3.11](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.11/the_project) |
| [1.12](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.12/the_project) | | [3.12](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/3.12/the_project)
| [1.13](https://github.com/jbbernardo7/devops-kubernetes-2026/tree/1.13/the_project) | |

---
## Exercise 3.9

| | DBaaS (Google Cloud SQL) | DIY |
|---|---|---|
| **Pros** | - Automated backups and Point-in-time recovery<br>- High availability<br>- You can scale the storage according to your DB needs<br>- Monitoring and Logging built into it<br>- Managed maintenance and upgrades<br>- Security and encryption handled by Google | - Full control of database configuration/storage/infra<br>- No separate costs besides your own compute/storage<br>- You can manage the Postgre in your own Kubernetes cluster |
| **Cons** | - Ongoing costs to run the database 24/7<br>- Less control over the database infrastructure/config<br>- Additional service that must connect to GKE, managed separately from the app<br>- Dependent on Google's services. An outage might cause the DB to go down as well. | - You have to handle backups, upgrades and disaster recovery yourself.<br>- No built-in remote access through an external service, requiring additional configuration<br>- Need to configure monitoring and logging<br>- Errors or poor configurations can result in data loss or downtime |