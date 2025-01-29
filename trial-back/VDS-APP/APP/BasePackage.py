from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_limiter import Limiter
from configparser import RawConfigParser
import logging

parser = RawConfigParser()
parser.read("../resources/config.properties")

db_path = parser.get('default', r'DATASOURCE')
log_file = parser.get('default', r'LOG_FILE')
log_level = parser.get('default', 'LOG_LEVEL')
dev_mode = parser.get('default', 'DEV_MODE')

db = SQLAlchemy()

limiter = Limiter(
    get_remote_address,
    default_limits=["100 per minute"]
)

logger = logging.getLogger(__name__)
logging.basicConfig(filename=log_file, level=logging.INFO,encoding='utf-8')
