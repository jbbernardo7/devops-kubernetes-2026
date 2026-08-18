FROM alpine:3.20

RUN apk add --no-cache bash curl postgresql16-client python3 py3-crcmod

RUN curl -sSL https://sdk.cloud.google.com | bash -s -- --disable-prompts --install-dir=/usr/local

ENV PATH="/usr/local/google-cloud-sdk/bin:${PATH}"

COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh

ENTRYPOINT ["/usr/local/bin/run.sh"]