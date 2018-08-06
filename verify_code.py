from captcha.image import ImageCaptcha


def verify_code(code, sha_code):
    png = ImageCaptcha()
    filename = 'static/code/{}.png'.format(sha_code)
    png.write(code, filename)
    return filename


if __name__ == '__main__':
    print(verify_code('123'))
