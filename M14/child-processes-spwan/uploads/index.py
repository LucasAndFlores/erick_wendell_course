import sys
import json
from urllib import request

def main():
    item = json.loads(sys.argv[1])
    url = item.get('url')
    file_path = item.get('filePath')
    data = open(file_path, 'rb').read()
    req = request.Request(url, data)
    response = request.urlopen(req).read().decode('utf-8')
    print(response)


if __name__ == '__main__':
    main()
