import smtplib

def sendEmail(address, emailText):
    ourAddress = 'twodice395@gmail.com'
    password = 'capstone396'
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.login(ourAddress, password)
    server.sendmail(ourAddress, address, emailText)
    server.quit()




