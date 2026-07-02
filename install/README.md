# install - [cannayci.de](https://can.nayci.de)

Goal is to have modularity for easy reusability.

## Usage:

You need the private key of the `ansible` user. Then:

```bash
set -a; source .env; set +a # for local testing, for pipeline: set CI vars :)
ansible-playbook -i inventory.ini install.yml
ansible-playbook -i inventory.ini page.yml
```

## Prerequisites

We need to maintain your executable of `ct2html` in `/opt/ct2html/ct2html` and the cgi-helper file - or wherever you set `$CT2HTML_CGI_PATH`.
This does not need to be done manually! It is handled by the pipeline responsible for deploying the page (meaning: copy page files from `/pageroot/`), since whenever page files change, they are written according to the newest version of the `ct2html`, and therefore when deploying the page, we download `ct2html` and the cgi helper.