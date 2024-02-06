sudo docker ps -a -q --filter "name=spring" | grep -q . && docker stop spring && docker rm spring | true

# 기존 이미지 삭제
sudo docker rmi yoojaegeon/spring:latest

# 도커허브 이미지 pull
docker build -t yoojaegeon/spring:latest .
# 도커 run
docker run -d -p 8081:8081 --name spring yoojaegeon/spring:latest

# 사용하지 않는 불필요한 이미지 삭제 -> 현재 컨테이너가 물고 있는 이미지는 삭제되지 않습니다.
docker rmi -f $(docker images -f "dangling=true" -q) || true
~
~
~                                                                       