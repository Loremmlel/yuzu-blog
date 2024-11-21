import os
import re
import requests

# 定义输入文件和输出文件夹
input_file = 'Heo.txt'
download_folder = 'downloaded_images'

# 确保下载文件夹存在，如果不存在则创建
if not os.path.exists(download_folder):
    os.makedirs(download_folder)

# 从 txt 文件中提取链接
def extract_links(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    # 使用正则表达式提取以 https:// 开头并以 .png 结尾的链接
    links = re.findall(r'https://\S+\.png', text)
    return links

# 下载图片的函数
def download_image(url, save_path):
    try:
        # 发送 GET 请求获取图片
        response = requests.get(url)
        response.raise_for_status()  # 如果响应状态码不是 200，将抛出异常

        # 写入文件
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded: {save_path}")
    except requests.RequestException as e:
        print(f"Failed to download {url}: {e}")

# 主程序
def main():
    links = extract_links(input_file)
    for url in links:
        # 提取文件名
        file_name = url.split('/')[-1]
        save_path = os.path.join(download_folder, file_name)

        # 下载图片并保存
        download_image(url, save_path)

    print("Download completed!")

if __name__ == '__main__':
    main()
