from flask import Flask, jsonify, request
from flask_cors import CORS
import os

# Start the app and setup the static directory for the html, css, and js files.
app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

# This is your 'database' of scripts with their blocking info.
# You can store python dictionaries in the format you decided on for your JSON
   # parse the text files in script_data to create these objects - do not send the text
   # files to the client! The server should only send structured data in the sallest format necessary.
scripts = []
parse(script)
def parse(script):
    af=[]
    scriptline=''
    start_char_list=[]
    end_char_list=[]
    actor=[]    
    for root, dirs, files in os.walk("app/script_data"):
        for filename in files:
            af.append(filename)
    for fn in af:
        f = open("app/script_data/"+fn)
        id=f.readline()
      
        #read rest of file
        content=f.readlines()
        scriptline=content[1].strip('\n')#get script
        for line in content[3:]:
            a=line.split('. ')#split by "." to delete part number
            b=a[1].strip('\n').split(', ')#delete newline character and split by ","
            start_char_list.append(b[0])
            end_char_list.append(b[1])
        #dict of actors-position of one part
            thisdict={}
            for ap in b[2:]:
                c=ap.split('-')
                thisdict[c[0]]=c[1]
            actor.append(thisdict)
        script_get_data={"script_text":scriptline,
                         "start_char":start_char_list,
                         "end_char": end_char_list,
                         "actor_postion":actor,}
        
        
        scriptdict={}
        scriptdict[id]=script_get_data
        scripts.append(scriptdict)

### DO NOT modify this route ###
@app.route('/')
def hello_world():
    return 'Theatre Blocking root route'

### DO NOT modify this example route. ###
@app.route('/example')
def example_block():
    example_script = "O Romeo, Romeo, wherefore art thou Romeo? Deny th6y father and refuse thy name. Or if thou wilt not, be but sworn my love And I’ll no longer be a Capulet."

    # This example block is inside a list - not in a dictionary with keys, which is what
    # we want when sending a JSON object with multiple pieces of data.
    return jsonify([example_script, 0, 41, 4])


''' Modify the routes below accordingly to 
parse the text files and send the correct JSON.'''

## GET route for script and blocking info
@app.route('/script/<int:script_id>')
def script(script_id):
    # right now, just sends the script id in the URL
    #get  "actor:id" dicton
    send={}
    fcsv=open("app/actors.csv")
    a1=fcsv.readlines()
    for csvline in  a1:
        newcsvline=csvline.strip("\n").split(",")
        send[ newcsvline[0]] =  newcsvline[1]
    for ap in scripts:
        if ap==str(script_id):
            script_get_data=ap
                
    #send a script and actor_number table         
    script_get_data['actor_table']=send
    return jsonify(script_get_data)


## POST route for replacing script blocking on server
# Note: For the purposes of this assignment, we are using POST to replace an entire script.
# Other systems might use different http verbs like PUT or PATCH to replace only part
# of the script.
@app.route('/script', methods=['POST'])
def addBlocking():
    # right now, just sends the original request json
    scriptnum=request.form['scriptNum']
    blocking=request.form['blocking']
    for ap in scripts:
        if ap== str(scriptnum):
            index=scripts.index(ap)
    scripts[index]['actor_position']=blocking        
            
            
    return jsonify(request.json)



if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))

