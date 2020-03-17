<?php

function isValidJson($strJson) {
    json_decode($strJson);
    return (json_last_error() === JSON_ERROR_NONE);
}

function unsetValue(array $array, $value)
{
    if(($key = array_search($value, $array)) !== FALSE) {
        unset($array[$key]);
    }
    return $array;
}

    $user = $_REQUEST['user'];
    $addtitle = $_REQUEST['addtitle'];
    $addid = $_REQUEST['addid'];
    $rmtitle = $_REQUEST['rmtitle'];
    $rmid = $_REQUEST['rmid'];

    if(empty($user)){
        echo "<p>Need a user</p>";
    }
    else {
        if(empty($addid) && empty($addtitle) && empty($rmid) && empty($rmtitle)){
            //Just get data
        }
        else {

/************************************      Add to database        *********************************************/

            if(!empty($addid) && !empty($addtitle) && empty($rmid) && empty($rmtitle)){

                $filename = $user.".lib";
                $file = fopen($filename, 'r+');
                $data = fread($file, filesize($filename));

                for ($i = 0; $i <= 31; ++$i) {
                    $data = str_replace(chr($i), "", $data);
                }
                $data = str_replace(chr(127), "", $data);
         
                if (0 === strpos(bin2hex($data), 'efbbbf')) {
                    $data = substr($data, 3);
                }

                $data = json_decode($data);
                        //echo var_dump($data) ;
                $newdata = new stdClass;
                $newdata->title = $addtitle;
                $newdata->id = $addid;
                foreach ($data as $key => &$value) {
                    if($key === 'videos'){
                        array_push($value, $newdata);
                    }
                }
                $data = json_encode($data);
                fclose($file);
                $file = fopen($filename, 'w+');
                fwrite($file, $data);
            }

/************************************      Add to database        *********************************************/
            else {

/************************************      Remove from database        *********************************************/


                if(empty($addid) && empty($addtitle) && !empty($rmid) && !empty($rmtitle)){

                $filename = $user.".lib";
                $file = fopen($filename, 'r+');
                $data = fread($file, filesize($filename));

                for ($i = 0; $i <= 31; ++$i) {
                    $data = str_replace(chr($i), "", $data);
                }
                $data = str_replace(chr(127), "", $data);
         
                if (0 === strpos(bin2hex($data), 'efbbbf')) {
                    $data = substr($data, 3);
                }

                $data = json_decode($data);

                $torm = new stdClass;
                $torm->title = $rmtitle;
                $torm->id = $rmid;
                
                foreach ($data as $key => &$value) {
                    if($key === 'videos'){
                        $value = unsetValue($value, $torm);
                    }
                }
                //echo var_dump($data)."</br>";
                $data = json_encode($data);
                fclose($file);
                $file = fopen($filename, 'w+');
                fwrite($file, $data);               

                }

/************************************      Remove from database        *********************************************/


            }

        }
    }

?>
