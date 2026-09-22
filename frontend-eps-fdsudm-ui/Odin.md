# Odin Threat Modeling

**Application Name:**     eps-fdsudm-ui

**Application ID:**       ebcad0e9-0a17-428e-91c5-e3b2cae406e3

**Application Category:** API and Web Services

**Erebor Check:**         NA

---

## Instructions

This section covers how to interact with `Odin.md`.

### Completing a Security Task

When you complete a security task, you can mark it as complete by replacing the white space in the square brackets with an `✓`, like this:

Replace &#9744; with &#9745;

### Adding Comments

You should add information about what you did to complete the task. To do so, add your text after the `>COMMENTS:` in the same line.

>Comments: The XYZ app is using OIDC for auth...

It is also possible to add bullet points, for that, hit enter after `>COMMENTS:` and in the line below type another angle bracket followed by `*`:

>Comments: We followed these steps to restrict the TLS ciphers:
>
>* Enabled FrontDoor on the App Service

---

## Checklist

### AUTHENTICATION

#### Authentication and Session Management

&#9744; ExxonMobil internal APIs shall use AAD-or ExxonMobil Authorize-issued OAuth 2 access tokens for authentication.

>COMMENTS: YOUR_TEXT_HERE

&#9744; In cases where APIs and services use passwords for authentication, ExxonMobil shall generate these passwords using a CSPRNG, and shall make the passwords long enough that they have at least 128 bits of entropy.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Service account passwords shall be rotated periodically. ExxonMobil should automate the credential rotation process, if possible.

>COMMENTS: YOUR_TEXT_HERE

#### General Authentication Security Requirements

&#9744; APIs must require that human users authenticate when needed to protect the API's confidentiality and integrity, or when an API needs to impose role-based access control.

>COMMENTS: YOUR_TEXT_HERE

&#9744; In APIs with multiple components (e.g., microservices), each component must authenticate every connection with every other component. APIs using standalone services S(e.g., SQL Server, Cassandra, Redis, RabbitMQ, FTP, etc.) must configure these services to require authentication.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Any new-development API that performs authentication on enterprise users or systems must use AAD.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Default service credentials must not be used in a production environment, or a non-prod cloud/hosted environment.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must not insert production credentials in source code.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs tend to expose endpoints that handle object identifiers, creating a wide attack surface Level Access Control issue. Object level authorization checks should be considered in every function that accesses a data source using an input from the user. (API1:2019 Broken Object Level Authorization)

>COMMENTS: YOUR_TEXT_HERE

&#9744; Authentication mechanisms are often implemented incorrectly, allowing attackers to compromise authentication tokens or to exploit implementation flaws to assume other user’s identities temporarily or permanently. Compromising a system’s ability to identify the client/user, compromises API security overall. (API2:2019 Broken User Authentication)

>COMMENTS: YOUR_TEXT_HERE

### ACCESS CONTROL

#### General Access Control Security Requirements

&#9744; APIs must enforce all access control rules in a trusted server environment.

>COMMENTS: YOUR_TEXT_HERE

&#9744;  APIs must grant each user role the minimum level of permissions needed for the users to fulfill their business needs.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must deny permissions by default and positively grant only the permissions a user requires (i.e., a permissions whitelist), rather than granting all permissions by default and removing permissions selectively (i.e., a permissions blacklist).

>COMMENTS: YOUR_TEXT_HERE

&#9744; If an API implements any sort of access control, the API team must document the access control rules that the API is expected to enforce.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should use declarative security controls, like access control annotations, instead of imperative permissions checks.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should limit the number of requests that a given user or machine can submit in a given space of time.

>COMMENTS: YOUR_TEXT_HERE

&#9744; ExxonMobil should configure API service accounts to provide the minimum level of privilege necessary for the API to perform its business role.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must enforce access control on all requests, including requests triggered by a server-side redirect.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should build access control into data layer (e.g., SQL) queries whenever possible.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must validate a user's given roles and permissions on access to a URL and reject requests that a user role has no business reason to perform.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Complex access control policies with different hierarchies, groups, and roles, and an unclear separation between administrative and regular functions, tend to lead to authorization flaws. By exploiting these issues, attackers gain access to other users’ resources and/or administrative functions. (API5:2019 Broken Function Level Authorization)

>COMMENTS: YOUR_TEXT_HERE

### COMMUNICATION STRATEGY

#### General Communication Strategy

&#9744; APIs must adopt controls to protect non-public traffic transmitted over the Internet, cloud service provider networks, or ExxonMobil internal networks.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should tokenize sensitive JSON data in scenarios that either the API client or API service do not need to directly read or manipulate sensitive data.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should establish a mechanism to prevent replay/brute force attacks (i.e., using cryptographic nonce).

>COMMENTS: YOUR_TEXT_HERE

&#9744; (API9:2019 Improper Assets Management) APIs tend to expose more endpoints than traditional web applications, making proper and updated documentation highly important. Proper hosts and deployed API versions inventory also play an important role to mitigate issues such as deprecated API versions and exposed debug endpoints.

>COMMENTS: YOUR_TEXT_HERE

#### Communications Security Requirements

&#9744; APIs must either use an approved TLS configuration or provide for additional communications security measures.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs shall not fall back to using unencrypted HTTP if the server cannot negotiate an HTTPS connection with the client.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs in production that use Transport Layer Security and are accessible from outside of ExxonMobil must have a TLS certificate signed by a public certificate authority (CA).

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must not use expired TLS certificates.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must not use RSA TLS certificates with a key length shorter than 2,048 bits.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Disable any cipher suite using the following encryption algorithms or hashes:
o DES
o 3DES
o RC4
o IDEA
o MD5

>COMMENTS: YOUR_TEXT_HERE

&#9744; ExxonMobil should configure APIs using HTTPS to support the Online Certificate Status Protocol (OCSP) if the tech stack and certificate authority support it.

>COMMENTS: YOUR_TEXT_HERE

&#9744; ExxonMobil should configure APIs to use HTTP Strict Transport Security if it can safely do so (i.e., if there are not and will not be any APIs on the same subdomain that do not serve content over HTTPS.)

>COMMENTS: YOUR_TEXT_HERE

### DATA PROTECTION

#### General Data Protection Security Requirements

&#9744; ExxonMobil should not collect and retain sensitive data unless it has a specific business reason why the data is needed, and retaining the data is worth the risk to ExxonMobil's organization.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must maintain at least two copies of important data, which must be updated periodically or continuously.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Looking forward to generic implementations, developers tend to expose all object properties without considering their individual sensitivity, relying on clients to perform the data filtering before displaying it to the user. (API3:2019 Excessive Data Exposure)

>COMMENTS: YOUR_TEXT_HERE

#### General Server Side Data Protection

&#9744; APIs should be designed to not maintain sensitive information in RAM longer than needed.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should zero highly sensitive pieces of data in RAM, like payment card numbers or encryption keys, once they are no longer needed.

>COMMENTS: YOUR_TEXT_HERE

&#9744; ExxonMobil shall design its caches and load balancers such that they either avoid caching sensitive data altogether or provide adequate protection for the cached sensitive data.

>COMMENTS: YOUR_TEXT_HERE

&#9744; ExxonMobil must encrypt RESTRICTED data at-rest, in-transit, and in-memory.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should be designed so that the minimum number of systems possible have access to INTERNAL-ONLY data and must be designed so that the minimum number of systems possible have access to CONFIDENTIAL or RESTRICTED data.

>COMMENTS: YOUR_TEXT_HERE

&#9744; (API6:2019 Mass Assignment) Binding client provided data (e.g., JSON) to data models, without proper properties filtering based on an allowlist, usually leads to Mass Assignment. Either guessing objects properties, exploring other API endpoints, reading the documentation, or providing additional object properties in request payloads, allows attackers to modify object properties they are not supposed to.

>COMMENTS: YOUR_TEXT_HERE

#### General Data Protection Security Requirements

&#9744; ExxonMobil should designate how long specific classes of data are retained and purge data that has exceeded its lifetime.

>COMMENTS: YOUR_TEXT_HERE

### JWT SECURITY

#### JSON Web-Token Security Requirements

&#9744; APIs must verify any JSON Web Token (JWT) provided as an OAuth bearer token on each API request.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must require that the JWT algorithm parameter (alg), located in the JWT header, to match the type of JWT signature expected from the authentication provider

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs in production environment must reject (with a 403 Forbidden error code) any attempt to authenticate with a JWT with the alg algorithm value set to "none".

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must validate the "Not Before" (nbf) and "Expiration Time" (exp) fields to validate that they are before and after the current time, respectively.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must validate the "Audience" (aud) field to ensure that the supplied JWT is intended for authentication against the API.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must escape HTML entities, such as "<" and ">", in JSON REST responses by encoding them using JSON's "\u" encoding (e.g., "<" becomes "\u003c").

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs returning JSON responses must ensure that the outer JSON element is an object, not an array.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must escape JSON control characters within strings before inserting them into a JSON object.

>COMMENTS: YOUR_TEXT_HERE

### MONITORING ALERTS

#### Monitoring Alerts

&#9744; If any functional service component of the API (such as a database or web service external to the API service itself) is not within a Mule Worker, the Azure host, or OpenShift, it must operate in an environment subject to performance monitoring and alerts.

>COMMENTS: YOUR_TEXT_HERE

### GRAPHQL SECURITY

#### GraphQL and other Web Service Data Layer Security Requirements

&#9744; Verify that query whitelisting or a combination of depth limiting and amount limiting should be used to prevent GraphQL or data layer expression denial of service (DoS) as a result of expensive, nested queries. For more advanced scenarios, query cost analysis should be used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that GraphQL or other data layer authorization logic should be implemented at the business logic layer instead of the GraphQL layer.

>COMMENTS: YOUR_TEXT_HERE

### ERROR HANDLING AND LOGGING

#### Error Handling Requirements

&#9744; APIs must explicitly define a response to system failure by both catching error conditions in the API�s code and by defining secure response behavior in the API configuration.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should have a default error handler to return a generic error (e.g., 500 Internal Server Error) if the API encounters an unexpected error condition.

>COMMENTS: YOUR_TEXT_HERE

&#9744; API error messages must disclose the minimum necessary information and not confirm or deny the existence of data to which that user is not entitled.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must not expose detailed error information, such as stack traces or register contents, to end users.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must emit a log message for each failure or unexpected event. APIs may log stack traces and should log stack traces for unexpected exceptions.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must store all logs in a central location. APIs can use a centralized ELK (Elasticsearch, Logstash, and Kibana) stack, for example, or may have a log storage location specific to the API.

>COMMENTS: YOUR_TEXT_HERE

&#9744; (API7:2019 Security Misconfiguration) Security misconfiguration is commonly a result of unsecure default configurations, incomplete or ad-hoc configurations, open cloud storage, misconfigured HTTP headers, unnecessary HTTP methods, permissive Cross-Origin resource sharing (CORS), and verbose error messages containing sensitive information.

>COMMENTS: YOUR_TEXT_HERE

&#9744; (API10:2019 Insufficient Logging & Monitoring) Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems to tamper with, extract, or destroy data. Most breach studies demonstrate the time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring.

>COMMENTS: YOUR_TEXT_HERE

### FILES AND RESOURCES

#### File and Resources Security requirements

&#9744; ExxonMobil must set an upper bound for uploaded file sizes and must reject uploads that exceed this limit.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must generate uploaded filenames, rather than allowing the uploaded filenames to be specified by an external system.

>COMMENTS: YOUR_TEXT_HERE

&#9744; ExxonMobil must validate that an uploaded file is in one of the formats that the API is expecting, and the format implied by its file extension.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must ensure that newly uploaded files, prior to proper validation, are stored in a location inaccessible to its users.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must use a third-party malware scanner such as clamav or a commercial antimalware scanner (e.g., Symantec, MacAfee) to scan uploaded files.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must serve non-public files to users through a web service or through a signed download link, not a direct download link to an S3 storage bucket (for example).

>COMMENTS: YOUR_TEXT_HERE

&#9744; Quite often, APIs do not impose any restrictions on the size or number of resources that can be requested by the client/user. Not only can this impact the API server performance, leading to Denial of Service (DoS), but also leaves the door open to authentication flaws such as brute force. (API4:2019 Lack of Resources & Rate Limiting)

>COMMENTS: YOUR_TEXT_HERE

### CRYPTOGRAPHY AT REST

#### Secret Management

&#9744; APIs must not store enterprise user passwords in nonvolatile storage, even if the API hashes or encrypts the user credentials.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must allow all printable ASCII characters and the space character in memorized secrets.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must require user-set memorized secrets to be at least 8 characters in length, and random, API-generated memorized secrets to be at least 6 characters in length.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must impose a maximum length limit on memorized secrets. This length limit must allow memorized secrets to contain at least 64 characters.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must validate newly changed user passwords against the following criteria.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must allow spaces in memorized secrets, including at the beginning or end of the memorized secret.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must not truncate memorized secrets. The API shall either evaluate the entire memorized secret or reject the memorized secret for being too long.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must protect memorized secrets using a hash algorithm specifically designed to protect credentials (i.e., a "password hash").

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs that allow users to change their memorized secrets should display an interactive "password-strength meter" that shows how strong (relatively speaking) the user's chosen memorized secret is.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs that allow user credential changes must store a Boolean �password_compromised� value alongside the user's password hash.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must not "require memorized secrets to be changed arbitrarily (e.g., periodically)."

>COMMENTS: YOUR_TEXT_HERE

#### One Time Password security

&#9744; ExxonMobil should use the Time-Based One-Time Password (TOTP) algorithm for OTP authentication over the older HMAC-Based One-Time Password (HOTP) algorithm or proprietary alternatives

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs shall use an approved CSPRNG to generate the OTP seed, such as Java's SecureRandom.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs shall not permit an OTP value to be used more than once, even if it is used as part of an unsuccessful authentication flow.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Development teams should choose at least two or three authentication APIs that they plan to officially support, and then test the chosen APIs during the development cycle.

>COMMENTS: YOUR_TEXT_HERE

#### Secret Management

&#9744; APIs must require that users enter their old memorized secrets allowing a memorized secret change.

>COMMENTS: YOUR_TEXT_HERE

### INPUT VALIDATION

#### General Validation Security Requirements

&#9744; APIs must adopt a strategy for ensuring that each piece of data in a request (including parameters, cookies, headers, and URLs) is considered valid and is free of malicious input.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must perform input validation on the server, or on another trusted system.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must define whitelist-based criteria for validating each point of input.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must validate all redirect URLs against a whitelist of valid, known-safe locations.

>COMMENTS: YOUR_TEXT_HERE

&#9744; To prevent Server-Side Request Forgery (SSRF) attacks, APIs must validate any externally supplied URL against a whitelist of known-safe locations and must avoid following URLs that do not match this whitelist.

>COMMENTS: YOUR_TEXT_HERE

#### Input Validation and output encoding

&#9744; ExxonMobil must specify a character set for each request and for every source of input.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must reject requests containing input that does not meet the set validation rules.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must either normalize all input based on a pre-defined Unicode normalization form (NFC, NFD, NFKC, or NFKD) or reject input that is not normalized to the specified form.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must use a pre-existing library or framework to perform HTML sanitization.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must sanitize user input before passing it over IMAP, POP3, or SMTP protocols.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must normalize any Unicode strings prior to sending them to other systems or storing them in a data store.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must use parameterized queries, stored procedures, Object-Relational Mapping (ORM) frameworks, or DB vendor-specific encoding routines when executing queries containing external input.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must encode or sanitize HTML output.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs should avoid using language-specific serialization like the serialization built into Java.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must include a cryptographic signature, using a MAC, authenticated cipher, or public key algorithm, with any language-serialized object.

>COMMENTS: YOUR_TEXT_HERE

#### XML-Specific Validation and Encoding

&#9744; APIs must sanitize or encode input from external systems before inserting it into XML responses, files, or databases.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs must either disable loading DTDs when parsing XML input or must load a whitelist of DTDs from a known-safe location.

>COMMENTS: YOUR_TEXT_HERE

&#9744; APIs using external input in XPath queries must either use parameterized XPath queries or escape the input prior to adding it to the query.

>COMMENTS: YOUR_TEXT_HERE

&#9744; (API8:2019 Injection) Injection flaws, such as SQL, NoSQL, Command Injection, etc., occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s malicious data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

>COMMENTS: YOUR_TEXT_HERE

### CONTAINERS

#### Infrastructure Verification Requirements

&#9744; Verify that the overall architecture and design including networking inside and outside of the container solution is defined.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the infrastructure, including all components thereof (nodes, networks, containers, ...) are documented (ideally fully automated).

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that all of the used components are supported/maintained and compatible with each other (OS, Docker Engine, UCP, DTR, ...).

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that adequate resources are allocated to all nodes for them to run stable.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the resources available to containers are limited (ulimit).

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that SELinux or AppArmor is enabled and running on all nodes as well as for _dockerd_.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that updates for both the nodes and the Docker Engine running on them are applied in regular intervals. Ideally, applying updates is fully automated.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that updates are rolled out using a canary deployment/release strategy, which allows rollbacks.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that _dockerd_ is configured with _live restore_ enabled.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that permissions to the configuration of _dockerd_ is restricted to users that actually need access to it and are properly logged.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that all nodes undergo regular automated security scans which cover the whole operating system and not just container related elements.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that container-specific operating systems (e.g. Container Linux, RancherOS, RedHat Project Atomic, VMware Photon) are used on all nodes instead of general-purpose ones.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that all nodes are hardened based on common best practices.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that unless otherwise specified, the default Docker configuration values are used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that direct access to nodes (e.g. via SSH or RDP) is restricted as much as possible.

>COMMENTS: YOUR_TEXT_HERE

#### Orchestration Management

&#9744; Verify that manager nodes are set up redundant and ready to support high availability.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that an odd number of manager nodes is deployed with a minimum of three nodes.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that managers are distributed across multiple data centers and availability zones.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that manager nodes run with _auto-lock_ enabled.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the orchestrator rebalances the active containers on a regular basis.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that manager nodes don't take on worker tasks and containers.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that predefined labels are used to properly identify and manage all resources.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that containers that are no longer needed are deleted.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that only containers with the same data classification level run on the same node.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that only containers with the same level of exposure (e.g. Internet facing) run on the same node.

>COMMENTS: YOUR_TEXT_HERE

#### Container Image

&#9744; Verify that an odd number of image registries (e.g., DTR) with a minimum of three registries is used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that garbage collection is enabled on the image registries and running on a regular basis.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that all images undergo regular automated security scans. Images pulled into ExxonMobil environment should be pulled into on-premise or managed cloud ExxonMobil. For disconnected cloud environments, utilize the built-in security scanning features of AWS/Azure container registries.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that containers are always created based on the most recent corresponding image and not local caches.

>COMMENTS: YOUR_TEXT_HERE

&#9744;  Users of the container platform should not freely deploy images from public repositories such as dockerhub. The images must be from the internal repositories that contain vetted images.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that all images are using tags whereas only production/master is allowed to use the default _latest_ tag.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Images pulled into ExxonMobil environment should undergo a security scan. A user scan request a security scan at goto/ssgrequest and selecting ‘Container Image Import’

>COMMENTS: YOUR_TEXT_HERE

#### Secrets and Keys

&#9744; Verify that an RBAC model to manage access control is used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that Docker Content Trust is enabled and enforced.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Sensitive information may never be part of a Dockerfile or Docker-Compose file. In particular, verify that e.g. Docker secrets are used for handling sensitive information like API keys and passwords.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that orchestration join keys are rotated in regular intervals.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that auto-lock keys are rotated in regular intervals if auto-lock is enabled.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that node certificates are rotated in regular intervals.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that CA certificates are rotated in regular intervals.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that your own CA is used for generating and verifying certificates used for mutual TLS authentication of inter-cluster communication.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the SSL/TLS certificates used (e.g. for UCP and DTR) are validated.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that secrets (e.g. cryptographic keys and passwords) are used securely with a secret management solution instead of e.g. exposed to a container by using environment variables.

>COMMENTS: YOUR_TEXT_HERE

#### Network

&#9744; Verify that a production ready networking driver is used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that load balancing features are activated (e.g. by using DNS Round Robin or virtual IPs (VIP)).

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the Docker userland proxy (which is enabled by default) is disabled.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the default bridge (_docker0_) is not used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that _dockerd_ is configured in a way that network communication between different containers is not possible by default. This can be done either by not using the _docker0_ bridge or setting _--icc_ to false.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that _dockerd_ is permitted to modify _iptables_ rules.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that published ports are assigned to a specific network interface of a node.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that management and data/application traffic is separated by different network interfaces.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that each application (one or more services) is assigned at least one separate, isolated overlay network in order to ensure Layer 3 segmentation.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that encryption between containers or nodes on the overlay network is enabled.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the used subnets do not overlap with other subnets (e.g. overlay networks).

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that published ports are limited to a necessary minimum.

>COMMENTS: YOUR_TEXT_HERE

#### Storage

&#9744; Verify that a production ready storage backend is used.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the image storage backend is redundant and located in a secured network zone.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that a suitable and tested data storage driver is used in order to ensure the replication and availability of application data.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that persistent data is never stored directly inside a container, but on a corresponding docker volume or mount point instead.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that persistent data is regularly backed up according to a suitable well defined backup concept and the restore is tested.

>COMMENTS: YOUR_TEXT_HERE

#### Logging Monitoring

&#9744; Verify that the underlying system, Docker Engine, as well as containers and their processes are logged.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the used resources at both node and container level are monitored.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the storage backend is monitored.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that Docker's health checking functionality is used for all containers and their status is monitored.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that all logs are transferred and stored to/in a central location.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that in production environments, the log level of _dockerd_ is set to _info_.

>COMMENTS: YOUR_TEXT_HERE

#### Disaster

&#9744; Verify that regular backups (UCP, DTR, and Swarm) are performed. A weekly backup has to be performed at a minimum.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the restoration of the infrastructure is automated, documented and regularly tested.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that upgrades and downgrades of the basic infrastructure as well as the Docker Engine is automated, documented and regularly tested.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that the recovery of individual applications/services is automated, documented and regularly tested.

>COMMENTS: YOUR_TEXT_HERE

&#9744; Verify that an `on-failure` restart policy is enabled for each container.

>COMMENTS: YOUR_TEXT_HERE


